import mockAxios from 'jest-mock-axios';
import { render, screen } from '@testing-library/react';
import Sedes from './Sede';

test('fetches and displays sedes', async () => {
    mockAxios.get.mockResolvedValueOnce({
        data: {
            status: {
                data: [
                    { id: 1, image: 'https://via.placeholder.com/150', name: 'Sede A', code: 'A001' },
                    { id: 2, image: 'https://via.placeholder.com/150', name: 'Sede B', code: 'B002' },
                ],
            },
        },
    });

    render(<Sedes token="fake-token" userAuth={{ name: 'Test User' }} onLogout={jest.fn()} />);
    
    expect(await screen.findByText('Sede A')).toBeInTheDocument();
    expect(await screen.findByText('Sede B')).toBeInTheDocument();
});
