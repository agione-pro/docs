type DocsProfile = Record<string, string>

const publicProfile: DocsProfile = {
  DOCS_PRODUCT_NAME_EN: 'AGIOne',
  DOCS_PRODUCT_NAME_ZH: 'AGIOne',
  DOCS_PRODUCT_POSSESSIVE_EN: "AGIOne's",
  DOCS_PRODUCT_POSSESSIVE_ZH: 'AGIOne 的',
  DOCS_BRAND_PREFIX_EN: 'AGIOne',
  DOCS_BRAND_PREFIX_ZH: 'AGIOne',
  DOCS_PLATFORM_URL_EN: 'https://agione.pro/',
  DOCS_PLATFORM_URL_ZH: 'https://agione.cc/',
  DOCS_LOGIN_URL_EN: 'https://agione.pro/user/login',
  DOCS_LOGIN_URL_ZH: 'https://agione.cc/user/login',
  DOCS_API_ENDPOINT_EN: 'https://agione.pro/hyperone/xapi/api/v1/chat/completions',
  DOCS_API_ENDPOINT_ZH: 'https://agione.cc/hyperone/xapi/api/v1/chat/completions',
  DOCS_MODEL_STORE_URL_EN: 'https://agione.pro/modelone/store/model',
  DOCS_MODEL_STORE_URL_ZH: 'https://agione.cc/modelone/store/model',
  DOCS_OPENCODE_URL_EN: 'https://agione.pro/docs/best-practice/integration/OpenCode.html',
  DOCS_OPENCODE_URL_ZH: 'https://agione.cc/docs/best-practice/integration/OpenCode.html',
  DOCS_RELEASE_PAGE_URL_EN: 'https://agione.pro/release/download/agione-release-latest',
  DOCS_RELEASE_PAGE_URL_ZH: 'https://agione.cc/release/download/agione-release-latest',
  DOCS_PROVIDER_EXAMPLE: 'AGIOneSystem',
  DOCS_CLOUD_PLATFORM_EN: 'AGIOne-powerone',
  DOCS_CLOUD_PLATFORM_ZH: 'AGIOne-powerone',
  DOCS_APP_EXAMPLE: 'OnePro-HyperBDR-AI',
  DOCS_TEST_EMAIL: 'user@onepro.cloud',
  DOCS_SUPPORT_EMAIL: 'Ecosys@oneprocloud.com',
  DOCS_PASSWORD: '********',
}

const privateProfile: DocsProfile = {
  DOCS_PRODUCT_NAME_EN: 'the platform',
  DOCS_PRODUCT_NAME_ZH: '平台',
  DOCS_PRODUCT_POSSESSIVE_EN: "the platform's",
  DOCS_PRODUCT_POSSESSIVE_ZH: '平台的',
  DOCS_BRAND_PREFIX_EN: 'Platform',
  DOCS_BRAND_PREFIX_ZH: '平台',
  DOCS_PLATFORM_URL_EN: 'https://example.com/',
  DOCS_PLATFORM_URL_ZH: 'https://example.com/',
  DOCS_LOGIN_URL_EN: 'https://example.com/user/login',
  DOCS_LOGIN_URL_ZH: 'https://example.com/user/login',
  DOCS_API_ENDPOINT_EN: 'https://example.com/hyperone/xapi/api/v1/chat/completions',
  DOCS_API_ENDPOINT_ZH: 'https://example.com/hyperone/xapi/api/v1/chat/completions',
  DOCS_MODEL_STORE_URL_EN: 'https://example.com/modelone/store/model',
  DOCS_MODEL_STORE_URL_ZH: 'https://example.com/modelone/store/model',
  DOCS_OPENCODE_URL_EN: 'https://example.com/docs/integration/OpenCode.html',
  DOCS_OPENCODE_URL_ZH: 'https://example.com/docs/integration/OpenCode.html',
  DOCS_RELEASE_PAGE_URL_EN: 'https://example.com/release/download/platform-release-latest',
  DOCS_RELEASE_PAGE_URL_ZH: 'https://example.com/release/download/platform-release-latest',
  DOCS_PROVIDER_EXAMPLE: 'PlatformSystem',
  DOCS_CLOUD_PLATFORM_EN: 'PrivateCloud',
  DOCS_CLOUD_PLATFORM_ZH: '私有云',
  DOCS_APP_EXAMPLE: 'Example-AI-App',
  DOCS_TEST_EMAIL: 'user@example.com',
  DOCS_SUPPORT_EMAIL: 'support@example.com',
  DOCS_PASSWORD: '********',
}

const requestedProfile = process.env.DOCS_PROFILE || 'public'
export const docsProfileName = requestedProfile === 'private' ? 'private' : 'public'
export const docsProfile = docsProfileName === 'private' ? privateProfile : publicProfile

export function installDocsProfile(md: any) {
  md.core.ruler.before('normalize', 'docs-profile', (state) => {
    state.src = state.src.replace(/\{\{([A-Z0-9_]+)\}\}/g, (full, key: string) => {
      return Object.prototype.hasOwnProperty.call(docsProfile, key) ? docsProfile[key] : full
    })
  })
}
