import { getByText, render, screen, user } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test("Page shows 'JavaScript' when repository includes a language property", () => {
  const repository = {
    stargazers_count: 12,
    open_issues: 13,
    forks: 15,
    language: "JavaScript",
  };

  // Render component
  render(<RepositoriesSummary repository={repository} />);

  // Find JSX element or manipulate the component
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.logTestingPlaygroundURL()
  const languageTextElement = screen.getByText(/JavaScript/i);

  // Verify element is in the document
  expect(languageTextElement).toBeInTheDocument();
});

test("Page doesn't show 'JavaScript' when repository doesn't include a language property value", () => {
  const repository = {
    stargazers_count: 12,
    open_issues: 13,
    forks: 15,
    language: undefined,
  };

  // Render component
  render(<RepositoriesSummary repository={repository} />);

  // Find JSX element or manipulate the component
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.logTestingPlaygroundURL()
  const languageTextElementPresent = screen.queryByText(/JavaScript/i); // use queryBy rather than getBy to verify something is NOT present b/c it returns false rather than throws an error

  // Verify element is in the document
  expect(languageTextElementPresent).toEqual(null);
})