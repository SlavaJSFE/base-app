import { render, screen } from '@testing-library/react';
import Header from './Header';

vi.mock('@components/Navbar/Navbar', () => ({
  default: () => <nav data-testid="navbar">Mock Navbar</nav>,
}));

vi.mock('@components/Logo/Logo', () => ({
  default: () => <div data-testid="logo">Mock Logo</div>,
}));

describe('Header component', () => {
  it('renders without errors', () => {
    render(<Header />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('contains a header tag with the required classes', () => {
    const { container } = render(<Header />);
    const headerEl = container.querySelector('header');

    expect(headerEl).toBeInTheDocument();
    expect(headerEl).toHaveClass('flex', 'justify-between', 'items-center', 'border-b');
  });

  it('renders Logo and Navbar inside header', () => {
    render(<Header />);
    const headerEl = screen.getByRole('banner');

    expect(headerEl).toContainElement(screen.getByTestId('logo'));
    expect(headerEl).toContainElement(screen.getByTestId('navbar'));
  });
});
