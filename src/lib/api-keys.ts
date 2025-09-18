// Production API Keys Management
// Bu dosya production'da environment variables'dan okur

interface APIKeys {
  gemini: {
    apiKey: string;
    baseUrl: string;
  };
  openai: {
    apiKey: string;
    baseUrl: string;
  };
}

export function getAPIKeys(): APIKeys {
  // Production'da environment variables'dan oku
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const geminiBaseUrl = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com';
  
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const openaiBaseUrl = process.env.OPENAI_BASE_URL || 'https://api.openai.com';

  if (!geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  if (!openaiApiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  return {
    gemini: {
      apiKey: geminiApiKey,
      baseUrl: geminiBaseUrl
    },
    openai: {
      apiKey: openaiApiKey,
      baseUrl: openaiBaseUrl
    }
  };
}

// API Key validation
export function validateAPIKeys(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  try {
    const keys = getAPIKeys();
    
    // Gemini validation
    if (!keys.gemini.apiKey || keys.gemini.apiKey.length < 20) {
      errors.push('Invalid Gemini API key');
    }
    
    // OpenAI validation  
    if (!keys.openai.apiKey || keys.openai.apiKey.length < 20) {
      errors.push('Invalid OpenAI API key');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : 'Unknown error']
    };
  }
}
