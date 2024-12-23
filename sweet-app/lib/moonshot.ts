/**
 * Moonshot API 客户端配置
 */
const MOONSHOT_CONFIG = {
  baseUrl: 'https://api.moonshot.cn/v1',
  apiKey: 'sk-IkmA6IeGUKuWIKU8N0YetsLIzTGG0YY0rwIMbd5Q68yAHNCs',
  defaultModel: 'moonshot-v1-8k',
}

/**
 * API 响应类型定义
 */
type MoonshotResponse = {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

/**
 * API 错误类型定义
 */
type MoonshotError = {
  error: {
    message: string
    type: string
    code: number
  }
}

/**
 * Moonshot API 调用类
 */
export class MoonshotAPI {
  private static instance: MoonshotAPI
  private readonly baseUrl: string
  private readonly apiKey: string
  private readonly defaultModel: string

  private constructor() {
    this.baseUrl = MOONSHOT_CONFIG.baseUrl
    this.apiKey = MOONSHOT_CONFIG.apiKey
    this.defaultModel = MOONSHOT_CONFIG.defaultModel
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): MoonshotAPI {
    if (!MoonshotAPI.instance) {
      MoonshotAPI.instance = new MoonshotAPI()
    }
    return MoonshotAPI.instance
  }

  /**
   * 发送聊天请求
   * @param prompt 提示语
   * @param options 可选配置
   * @returns Promise<string>
   */
  public async chat(
    prompt: string,
    options?: {
      model?: string
      temperature?: number
      max_tokens?: number
      stream?: boolean
    }
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: options?.model || this.defaultModel,
          messages: [
            {
              role: 'system',
              content: '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: options?.temperature || 0.3,
          max_tokens: options?.max_tokens || 1024,
          stream: options?.stream || false,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json() as MoonshotError
        throw new Error(errorData.error.message)
      }

      const data = await response.json() as MoonshotResponse
      return data.choices[0].message.content
    } catch (error) {
      console.error('Moonshot API 调用失败:', error)
      throw error
    }
  }

  /**
   * 获取账户余额
   * @returns Promise<number>
   */
  public async getBalance(): Promise<number> {
    try {
      const response = await fetch(`${this.baseUrl}/users/me/balance`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error('获取余额失败')
      }

      const data = await response.json()
      return data.data.available_balance
    } catch (error) {
      console.error('获取余额失败:', error)
      throw error
    }
  }
}

// 导出单例实例
export const moonshotAPI = MoonshotAPI.getInstance()
