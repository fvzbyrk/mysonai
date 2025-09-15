import { useState, useCallback } from 'react';
import { AgentTeam, findSuitableTeam, getTeamById } from '@/lib/agent-collaboration';

export interface CollaborationResult {
  success: boolean;
  team?: AgentTeam;
  collaborationType?: string;
  response?: string;
  agents?: Array<{
    id: string;
    name: string;
    role: string;
    icon: string;
  }>;
  agentResponses?: Array<{
    agentId: string;
    name: string;
    response: string;
  }>;
  error?: string;
}

export function useAgentCollaboration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkCollaboration = useCallback(async (userQuery: string, currentAgentId?: string): Promise<CollaborationResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat/collaboration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userQuery,
          currentAgentId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'İşbirliği kontrolü başarısız');
      }

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const getCollaborationSuggestion = useCallback((userQuery: string): AgentTeam | null => {
    return findSuitableTeam(userQuery);
  }, []);

  const getTeamInfo = useCallback((teamId: string): AgentTeam | null => {
    return getTeamById(teamId);
  }, []);

  return {
    loading,
    error,
    checkCollaboration,
    getCollaborationSuggestion,
    getTeamInfo,
  };
}
