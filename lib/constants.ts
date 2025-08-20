export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MendelCorp';
export const APP_SLOGAN = process.env.NEXT_PUBLIC_APP_SLOGAN || 'Dépensez moins, profitez plus.';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Un site e-commerce réalisé avec Next.js et MongoDB';

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)

export const FREE_SHIPPING_MIN_PRICE = Number(
    process.env.FREE_SHIPPING_MIN_PRICE || 35
  )