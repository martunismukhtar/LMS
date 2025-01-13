import { atom } from 'jotai';

export const isOpenMenuState = atom<boolean>(false);
export const jenisFormState = atom<string>('');

export const returnMessageState = atom<{visible: boolean, message: string, type?: "success" | "error" | "info" | undefined }>({
    visible: false,
    message: '',
    type: undefined
});
