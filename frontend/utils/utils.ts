/**
 * Alias for document.querySelector
 * @param selector valid css selector
 * @returns dom element or null
 */

export const select = (selector: string): HTMLElement | null => document.querySelector(selector)
