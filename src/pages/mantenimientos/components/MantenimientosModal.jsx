import React from 'react';
import { Modal } from '../../../components/Modal';
import { MantenimientoForm } from './MantenimientoForm';

export const MantenimientosModal = ({
  isOpen,
  onClose,
  selectedUser,
  onConfirm,
  confirmLabel,
  isConfirming,
  form,
  onChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedUser ? 'Editar Mantenimiento' : 'Crear Mantenimiento'}
      description={
        selectedUser
          ? 'Revisa y confirma los datos antes de enviarlos.'
          : 'Completa los datos para crear un nuevo mantenimiento.'
      }
      onConfirm={onConfirm}
      confirmLabel={confirmLabel}
      isConfirming={isConfirming}
    >
      <MantenimientoForm
        form={form}
        onChange={onChange}
        isCreating={!selectedUser}
        onCancel={onClose}
      />
    </Modal>
  );
};
