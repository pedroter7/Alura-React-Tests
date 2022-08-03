import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Conta from './Conta';

describe('Ao realizar uma transação', () => {
    it('A função passada como props é chamada', () => {
        const mockFunc = jest.fn();
        render(<Conta realizarTransacao={mockFunc} saldo={1000} />);
        fireEvent.click(screen.getByText('Realizar operação'));
        expect(mockFunc).toHaveBeenCalled();
    });
});