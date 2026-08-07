import React from 'react';
import { Modal } from '../../../components/Modal';
import UserForm from './UserForm';

const UserModal = ({ isOpen, onClose, selectedUser, onConfirm, confirmLabel, isConfirming, form, onChange }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedUser ? 'Editar usuario' : 'Agregar usuario'}
      description={selectedUser ? 'Revisa y confirma los datos antes de enviarlos.' : 'Completa los datos para crear un nuevo usuario.'}
      onConfirm={onConfirm}
      confirmLabel={confirmLabel}
      isConfirming={isConfirming}
    >
      <UserForm form={form} onChange={onChange} isCreating={!selectedUser} onCancel={onClose} />
    </Modal>
  );
};

export default UserModal;
