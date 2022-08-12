import {render, screen} from '@testing-library/react';
import {makeFakeComment} from '../../utils/mocks';
import {Review} from '../index';
import {formattingCommentDate} from '../../utils/common';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const mockComment = makeFakeComment();
    const commentDate = formattingCommentDate(mockComment.date);

    render (
      <Review review={mockComment}/>
    );

    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    expect(screen.getByText(mockComment.rating)).toBeInTheDocument();
    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(commentDate)).toBeInTheDocument();
  });
});
