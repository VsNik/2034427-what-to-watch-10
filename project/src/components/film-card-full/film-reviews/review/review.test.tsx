import {render, screen} from '@testing-library/react';
import {makeFakeComment} from '../../../../utils/mocks';
import Review from './review';
import {formattingCommentDate} from '../../../../utils/common';

describe('Component: Review', () => {
  it('should render correctly', () => {
    const fakeComment = makeFakeComment();
    const commentDate = formattingCommentDate(fakeComment.date);

    render (
      <Review review={fakeComment}/>
    );

    expect(screen.getByText(fakeComment.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.rating)).toBeInTheDocument();
    expect(screen.getByText(fakeComment.user.name)).toBeInTheDocument();
    expect(screen.getByText(commentDate)).toBeInTheDocument();
  });
});
