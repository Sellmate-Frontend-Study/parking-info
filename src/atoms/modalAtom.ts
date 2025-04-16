import { atom } from 'jotai';

interface ModalProps {
	isOpen?: boolean;
	persist?: boolean;
	zIndex?: number;
}

export const modalAtom = atom<ModalProps>({ isOpen: false, persist: false, zIndex: 99999 });

export const openModalAtom = atom(
	null, // value가 없기때문에 readonly
	(get, set, props?: ModalProps) => {
		// get: 다른 atom의 값을 읽을 수 있음
		// set: 다른 atom에 값을 설정할 수 있음
		// props: 나머지 속성들을 설정할 수 있음 (확장성(?) 고려)
		const modalProps = get(modalAtom);
		set(modalAtom, { ...modalProps, ...props, isOpen: true });
	}
);

export const closeModalAtom = atom(null, (get, set) => {
	const modalProps = get(modalAtom);
	if (modalProps.persist) return;
	set(modalAtom, { ...modalProps, isOpen: false, persist: false });
});
