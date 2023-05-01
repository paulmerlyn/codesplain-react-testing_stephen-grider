import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils'; // we typically won't want to use act() directly. RTL uses it for us indirectly in its findBy__ query selectors
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router-dom'; // the <Link /> component in our test depends on a stand-alone router to wrap our test component

const RenderComponent = async () => {
  const repository = {
    full_name: "superHelper/superHelper",
    language: "Javascript",
    description: "An inconceivably helpful library for doing anything and everything without any effort",
    owner: "Bernard Cribbins",
    name: "SuperHelper",
    html_url: "https://github.com/axios/axios",
  }

  // Render component. Note: the <Link /> component in our test depends on a stand-alone router to wrap our test component
  render(<MemoryRouter><RepositoriesListItem repository={repository} /></MemoryRouter>)

  // Deal with the act() warning, which was caused by a FileIcon dependency component
  await screen.findByRole('img', { name: "Javascript"}); // this will overcome the act() warning cause by FileIcon dependency
  
  return { repository };
}

test("Repository has link to GitHub", async () => {
  const { repository } = await RenderComponent();
  console.log(`html_url from repository() is: ${repository.html_url}`);

  // Find JSX element or manipulate component
  const linkElem = screen.getByRole("link", { name: /github repository/i});

  // Check for element on page
  expect(linkElem).toHaveAttribute('href');
  expect(linkElem).toHaveAttribute('href', repository.html_url);
})