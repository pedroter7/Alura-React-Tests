import React from 'react';
import { render } from '@testing-library/react';
import Transacao from './Transacao';

describe('<Transacao />', () => {
    it('snapshot', () => {
        const tree = render(
            <Transacao 
                data='05/05/2022'
                tipo='deposito'
                valor='250.00'
            />
        );

        expect(tree).toMatchSnapshot();
    });
});