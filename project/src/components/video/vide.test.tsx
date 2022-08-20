import {fireEvent, render, screen} from '@testing-library/react';
import Video from './video';
import {VIDEO_URL} from '../../utils/mocks';

const MOCK_POSTER = 'mock-poster-url';

describe('Component: Video', () => {
  it('should render correctly', () => {
    const mockOnLoadedMetadata = jest.fn();

    render(
      <Video
        src={VIDEO_URL}
        poster={MOCK_POSTER}
        onLoadedMetadata={mockOnLoadedMetadata}
      />
    );

    expect(screen.getByTestId('player-video')).toHaveAttribute('src', VIDEO_URL);
    expect(screen.getByTestId('player-video')).toHaveAttribute('poster', MOCK_POSTER);

    fireEvent(screen.getByTestId('player-video') as Element,
      new Event('loadedmetadata'));

    expect(mockOnLoadedMetadata).toBeCalled();
  });
});
