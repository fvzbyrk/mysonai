'use client';

import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { cn } from '@/lib/utils';

interface VirtualScrollProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (props: { index: number; style: React.CSSProperties; item: T }) => React.ReactNode;
  className?: string;
  overscanCount?: number;
  onScroll?: (scrollOffset: number) => void;
}

export function VirtualScroll<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className,
  overscanCount = 5,
  onScroll,
}: VirtualScrollProps<T>) {
  const itemData = useMemo(() => items, [items]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = itemData[index];
    return renderItem({ index, style, item });
  };

  return (
    <div className={cn('w-full', className)}>
      <List
        height={height}
        itemCount={items.length}
        itemSize={itemHeight}
        itemData={itemData}
        overscanCount={overscanCount}
        onScroll={onScroll}
      >
        {Row}
      </List>
    </div>
  );
}

// Infinite scroll variant
interface InfiniteVirtualScrollProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (props: { index: number; style: React.CSSProperties; item: T }) => React.ReactNode;
  className?: string;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  loadNextPage: () => void;
  overscanCount?: number;
}

export function InfiniteVirtualScroll<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className,
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
  overscanCount = 5,
}: InfiniteVirtualScrollProps<T>) {
  const itemData = useMemo(() => items, [items]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = itemData[index];
    return renderItem({ index, style, item });
  };

  const itemCount = hasNextPage ? items.length + 1 : items.length;

  return (
    <div className={cn('w-full', className)}>
      <List
        height={height}
        itemCount={itemCount}
        itemSize={itemHeight}
        itemData={itemData}
        overscanCount={overscanCount}
        onItemsRendered={({ visibleStopIndex }) => {
          if (visibleStopIndex >= items.length - 1 && hasNextPage && !isNextPageLoading) {
            loadNextPage();
          }
        }}
      >
        {Row}
      </List>
    </div>
  );
}