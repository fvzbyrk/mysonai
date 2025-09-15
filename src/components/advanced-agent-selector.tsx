'use client';

import { useState, useEffect } from 'react';
import { Bot, Users, Zap, Brain, Search, Code, Eye, Database, Mic, Volume2 } from 'lucide-react';
import { getAllAgents } from '@/lib/ai-agents';
import { getAllTeams, type AgentTeam } from '@/lib/agent-collaboration';
import { type MultiAgentMode } from '@/lib/advanced-gpt-features';

interface AdvancedAgentSelectorProps {
  onAgentSelect: (agentId: string) => void;
  onTeamSelect: (teamId: string) => void;
  onMultiAgentSelect: (agentIds: string[], mode: MultiAgentMode) => void;
  onFeatureToggle: (feature: string, enabled: boolean) => void;
  selectedAgents: string[];
  selectedTeam: string;
  selectedMode: MultiAgentMode;
  activeFeatures: Record<string, boolean>;
}

export function AdvancedAgentSelector({
  onAgentSelect,
  onTeamSelect,
  onMultiAgentSelect,
  onFeatureToggle,
  selectedAgents,
  selectedTeam,
  selectedMode,
  activeFeatures
}: AdvancedAgentSelectorProps) {
  const [activeTab, setActiveTab] = useState<'agents' | 'teams' | 'multi' | 'features'>('agents');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const agents = getAllAgents();
  const teams = getAllTeams();

  // Filtrelenmiş ajanlar
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filtrelenmiş takımlar
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.triggerKeywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Çoklu ajan modları
  const multiAgentModes: { mode: MultiAgentMode; label: string; icon: any; description: string }[] = [
    { mode: 'race', label: 'Yarış Modu', icon: Zap, description: 'En hızlı cevap kazanır' },
    { mode: 'consensus', label: 'Fikir Birliği', icon: Brain, description: 'En kaliteli cevap kazanır' },
    { mode: 'debate', label: 'Tartışma Modu', icon: Users, description: 'Ajanlar tartışır' },
    { mode: 'collaborative', label: 'İşbirliği', icon: Users, description: 'Birlikte çalışır' },
    { mode: 'sequential', label: 'Sıralı', icon: Bot, description: 'Sırayla çalışır' },
    { mode: 'parallel', label: 'Paralel', icon: Zap, description: 'Aynı anda çalışır' }
  ];

  // Gelişmiş özellikler
  const features = [
    { id: 'functionCalling', label: 'Fonksiyon Çağırma', icon: Code, description: 'Araçları kullanabilir' },
    { id: 'vision', label: 'Görü Analizi', icon: Eye, description: 'Resimleri analiz eder' },
    { id: 'codeInterpreter', label: 'Kod Yorumlama', icon: Code, description: 'Kodu çalıştırır' },
    { id: 'webSearch', label: 'Web Arama', icon: Search, description: 'İnternette arama yapar' },
    { id: 'fileAnalysis', label: 'Dosya Analizi', icon: Database, description: 'Dosyaları analiz eder' },
    { id: 'memory', label: 'Uzun Süreli Hafıza', icon: Brain, description: 'Bilgileri hatırlar' },
    { id: 'streaming', label: 'Gerçek Zamanlı', icon: Volume2, description: 'Anlık yanıt verir' }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/5 rounded-lg p-1">
        {[
          { id: 'agents', label: 'Ajanlar', icon: Bot },
          { id: 'teams', label: 'Takımlar', icon: Users },
          { id: 'multi', label: 'Çoklu', icon: Zap },
          { id: 'features', label: 'Özellikler', icon: Brain }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ajan veya takım ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Content */}
      <div className="max-h-64 overflow-y-auto">
        {activeTab === 'agents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredAgents.map(agent => (
              <button
                key={agent.id}
                onClick={() => onAgentSelect(agent.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedAgents.includes(agent.id)
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{agent.icon}</div>
                  <div className="text-left">
                    <h3 className="text-white font-medium text-sm">{agent.name}</h3>
                    <p className="text-gray-300 text-xs">{agent.role}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'teams' && (
          <div className="space-y-3">
            {filteredTeams.map(team => (
              <button
                key={team.id}
                onClick={() => onTeamSelect(team.id)}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  selectedTeam === team.id
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-2xl">{team.icon}</div>
                  <div>
                    <h3 className="text-white font-medium">{team.name}</h3>
                    <p className="text-gray-300 text-sm">{team.description}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs">{team.useCase}</p>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'multi' && (
          <div className="space-y-4">
            {/* Mode Selection */}
            <div>
              <h3 className="text-white font-medium mb-3">İşbirliği Modu</h3>
              <div className="grid grid-cols-2 gap-2">
                {multiAgentModes.map(({ mode, label, icon: Icon, description }) => (
                  <button
                    key={mode}
                    onClick={() => onMultiAgentSelect(selectedAgents, mode)}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      selectedMode === mode
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-medium">{label}</span>
                    </div>
                    <p className="text-gray-400 text-xs">{description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Selection for Multi-Agent */}
            <div>
              <h3 className="text-white font-medium mb-3">Ajan Seçimi ({selectedAgents.length}/5)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {agents.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => {
                      if (selectedAgents.includes(agent.id)) {
                        onMultiAgentSelect(
                          selectedAgents.filter(id => id !== agent.id),
                          selectedMode
                        );
                      } else if (selectedAgents.length < 5) {
                        onMultiAgentSelect([...selectedAgents, agent.id], selectedMode);
                      }
                    }}
                    disabled={!selectedAgents.includes(agent.id) && selectedAgents.length >= 5}
                    className={`p-2 rounded-lg border transition-all text-left ${
                      selectedAgents.includes(agent.id)
                        ? 'border-purple-500 bg-purple-500/20'
                        : selectedAgents.length >= 5
                        ? 'border-gray-600 bg-gray-600/20 opacity-50'
                        : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="text-lg">{agent.icon}</div>
                      <span className="text-white text-sm">{agent.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-3">
            {features.map(feature => (
              <div
                key={feature.id}
                className={`p-3 rounded-lg border transition-all ${
                  activeFeatures[feature.id]
                    ? 'border-green-500 bg-green-500/20'
                    : 'border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <feature.icon className="w-5 h-5 text-white" />
                    <div>
                      <h3 className="text-white font-medium text-sm">{feature.label}</h3>
                      <p className="text-gray-400 text-xs">{feature.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onFeatureToggle(feature.id, !activeFeatures[feature.id])}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      activeFeatures[feature.id]
                        ? 'bg-green-500'
                        : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        activeFeatures[feature.id] ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Toggle */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
        >
          <Brain className="w-4 h-4" />
          <span className="text-sm">Gelişmiş Ayarlar</span>
        </button>
        
        {showAdvanced && (
          <div className="mt-3 space-y-2">
            <div className="text-xs text-gray-400">
              • Model: GPT-4 Turbo<br/>
              • Temperature: 0.7<br/>
              • Max Tokens: 2000<br/>
              • Streaming: Aktif
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
