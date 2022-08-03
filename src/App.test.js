import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { calcularNovoSaldo } from './App';

describe('Componente App', () => {
    describe('Quando abro o app do banco', () => {
        it('O nome do banco está visível', () => {
            render(<App />);
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        });
        it('O botão de realizar operação está visível', () => {
            render(<App />);
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        });
        it('O saldo está visível', () => {
            render(<App />);
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        });
    });
    describe('Quando realizo uma operação', () => {
        it('Saque: o novo saldo deve ser menor', () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            };
            const novoSaldo = calcularNovoSaldo(valores, 150);
            expect(novoSaldo).toBe(100);
        });
        it('Saque: quando não há saldo suficiente ocorre um erro', () => {
            const valores ={
                transacao: 'saque',
                valor: 100
            };
            expect(() => calcularNovoSaldo(valores, 50)).toThrow();
        });
        it('Saque: a UI deve ser atualizada para refletir os novos valores', () => {
            render(<App />);

            const saldo = screen.getByText('R$ 1000');
            const radioTransacao = screen.getByLabelText('Saque');
            const campoValorOp = screen.getByTestId('valor');
            const botaoRealizarOp = screen.getByText('Realizar operação');

            expect(saldo.textContent).toBe('R$ 1000');

            fireEvent.click(radioTransacao, {
                target: {
                    value: 'saque'
                }
            });
            fireEvent.change(campoValorOp, {
                target: {
                    value: 100
                }
            });
            fireEvent.click(botaoRealizarOp);

            expect(saldo.textContent).toBe('R$ 900');

        });
    });
});