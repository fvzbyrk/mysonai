"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface VirtualScrollProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  overscan?: number
  onScroll?: (scrollTop: number) => void
}

export function VirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  overscan = 5,
  onScroll,
}: VirtualScrollProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length - 1
    )
    
    return {
      start: Math.max(0, startIndex - overscan),
      end: endIndex,
    }
  }, [scrollTop, itemHeight, containerHeight, items.length, overscan])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end + 1)
  }, [items, visibleRange])

  const totalHeight = items.length * itemHeight
  const offsetY = visibleRange.start * itemHeight

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const newScrollTop = e.currentTarget.scrollTop
    setScrollTop(newScrollTop)
    onScroll?.(newScrollTop)
  }

  return (
    <div
      ref={containerRef}
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => {
            const actualIndex = visibleRange.start + index
            return (
              <div
                key={actualIndex}
                style={{ height: itemHeight }}
                className="flex items-center"
              >
                {renderItem(item, actualIndex)}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Hook for virtual scrolling with dynamic item heights
export function useVirtualScroll<T>(
  items: T[],
  containerHeight: number,
  getItemHeight: (item: T, index: number) => number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0)
  const [itemHeights, setItemHeights] = useState<number[]>([])

  useEffect(() => {
    const heights = items.map((item, index) => getItemHeight(item, index))
    setItemHeights(heights)
  }, [items, getItemHeight])

  const totalHeight = useMemo(() => {
    return itemHeights.reduce((sum, height) => sum + height, 0)
  }, [itemHeights])

  const visibleRange = useMemo(() => {
    let currentHeight = 0
    let startIndex = 0
    let endIndex = 0

    // Find start index
    for (let i = 0; i < items.length; i++) {
      if (currentHeight + itemHeights[i] > scrollTop) {
        startIndex = Math.max(0, i - overscan)
        break
      }
      currentHeight += itemHeights[i]
    }

    // Find end index
    currentHeight = 0
    for (let i = 0; i < items.length; i++) {
      currentHeight += itemHeights[i]
      if (currentHeight > scrollTop + containerHeight) {
        endIndex = Math.min(items.length - 1, i + overscan)
        break
      }
    }

    return { start: startIndex, end: endIndex }
  }, [scrollTop, containerHeight, itemHeights, items.length, overscan])

  const offsetY = useMemo(() => {
    return itemHeights.slice(0, visibleRange.start).reduce((sum, height) => sum + height, 0)
  }, [itemHeights, visibleRange.start])

  return {
    visibleRange,
    totalHeight,
    offsetY,
    setScrollTop,
  }
}
