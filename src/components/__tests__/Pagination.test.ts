import Pagination from '@/components/Pagination.vue';
import { fireEvent, render, screen } from '@testing-library/vue';

describe('Pagination.vue', () => {
  it('renders correctly with current page and total pages', () => {
    render(Pagination, {
      props: {
        currentPage: 2,
        totalPages: 5,
      },
    });

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('disables the "Prev" button on the first page', () => {
    render(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    });
    const prevButton = screen.getByText('Prev') as HTMLButtonElement;

    expect(prevButton).toBeDisabled();
  });

  it('disables the "Next" button on the last page', () => {
    render(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    });
    const nextButton = screen.getByText('Next') as HTMLButtonElement;

    expect(nextButton).toBeDisabled();
  });

  it('emits "change-page" with the previous page when "Prev" button is clicked', async () => {
    const { emitted } = render(Pagination, {
      props: {
        currentPage: 3,
        totalPages: 5,
      },
    });
    const prevButton = screen.getByText('Prev');

    await fireEvent.click(prevButton);

    expect(emitted()['change-page']).toHaveLength(1);
    expect(emitted()['change-page'][0]).toEqual([2]); // previous page was 3
  });

  it('emits "change-page" with the next page when "Next" button is clicked', async () => {
    const { emitted } = render(Pagination, {
      props: {
        currentPage: 3,
        totalPages: 5,
      },
    });
    const nextButton = screen.getByText('Next');

    await fireEvent.click(nextButton);

    expect(emitted()['change-page']).toHaveLength(1);
    expect(emitted()['change-page'][0]).toEqual([4]); // previous page was 3
  });

  it('does not emit "change-page" when "Prev" button is clicked on the first page', async () => {
    const { emitted } = render(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    });
    const prevButton = screen.getByText('Prev');

    await fireEvent.click(prevButton);

    expect(emitted()['change-page']).toBeUndefined();
  });

  it('does not emit "change-page" when "Next" button is clicked on the last page', async () => {
    const { emitted } = render(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    });
    const nextButton = screen.getByText('Next');

    await fireEvent.click(nextButton);

    expect(emitted()['change-page']).toBeUndefined();
  });
});
