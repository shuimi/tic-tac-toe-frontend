import { localStorageEffect } from "../../effects";
import { atom, selector } from "recoil";
import { AuthAtomModel } from "../../models/auth/auth-atom.model";


export const currentUserAtom = atom<AuthAtomModel>({
  key: 'CurrentUserAtom',
  default: undefined,
  effects: [localStorageEffect('CurrentUser')]
})

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({get}) => !!get(currentUserAtom)
})
