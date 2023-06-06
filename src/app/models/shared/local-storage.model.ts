export interface ILocalStorage {
  getItems (): string
  getParsedItems (): unknown
  setItem (v: unknown): void
  updateItem(uuid: string, item: unknown): void
  removeItem (uuid: string): void
  clearStore (): void
}
