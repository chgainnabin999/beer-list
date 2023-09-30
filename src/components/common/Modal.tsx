import { ReactNode } from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  setIsOpen,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      className="fixed inset-0 flex items-center justify-center z-1"
      appElement={document.getElementById('root') as HTMLElement}
      style={{
        overlay: {
          backgroundColor: 'rgba(162, 162, 162, 0.9)',
        },
      }}
      shouldCloseOnOverlayClick
      overlayElement={(props, contentElement) => (
        <div className="fixed inset-0 bg-grey-100" {...props}>
          {contentElement}
        </div>
      )}
      onRequestClose={closeModal}
    >
      <div className="bg-white lg:w-2/5 md:3/5 w-4/5 p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-4 text-black">
          <h2 className="text-3xl ml-4 font-primary">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;
