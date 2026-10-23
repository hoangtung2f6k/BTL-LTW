import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserPhotos from './components/UserPhotos';
import models from './modelData/models';

describe('Photo Sharing Application Tests', () => {
  test('TopBar renders author name on the left', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <TopBar />
      </MemoryRouter>
    );
    expect(screen.getByText('Nghiêm Xuân Hoàng Tùng')).toBeInTheDocument();
  });

  test('TopBar renders context on user details route', () => {
    const user = models.userListModel()[0];
    render(
      <MemoryRouter initialEntries={[`/users/${user._id}`]}>
        <TopBar />
      </MemoryRouter>
    );
    expect(screen.getByText(`${user.first_name} ${user.last_name}`)).toBeInTheDocument();
  });

  test('TopBar renders context on user photos route', () => {
    const user = models.userListModel()[0];
    render(
      <MemoryRouter initialEntries={[`/photos/${user._id}`]}>
        <TopBar />
      </MemoryRouter>
    );
    expect(
      screen.getByText(`Photos of ${user.first_name} ${user.last_name}`)
    ).toBeInTheDocument();
  });

  test('UserList renders all users from models', () => {
    const users = models.userListModel();
    render(
      <MemoryRouter initialEntries={['/']}>
        <UserList />
      </MemoryRouter>
    );
    users.forEach((u) => {
      expect(screen.getByText(`${u.first_name} ${u.last_name}`)).toBeInTheDocument();
    });
  });

  test('UserDetail renders user information and View Photos button', () => {
    const user = models.userListModel()[0];
    render(
      <MemoryRouter initialEntries={[`/users/${user._id}`]}>
        <Routes>
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(`${user.first_name} ${user.last_name}`)).toBeInTheDocument();
    expect(screen.getByText(user.location)).toBeInTheDocument();
    expect(screen.getByText(user.occupation)).toBeInTheDocument();
    expect(screen.getByText(user.description)).toBeInTheDocument();
    const photosButton = screen.getByRole('link', { name: /view photos/i });
    expect(photosButton).toBeInTheDocument();
    expect(photosButton.getAttribute('href')).toBe(`/photos/${user._id}`);
  });

  test('UserPhotos renders photos and comments for user', () => {
    const user = models.userListModel()[0];
    const photos = models.photoOfUserModel(user._id);
    render(
      <MemoryRouter initialEntries={[`/photos/${user._id}`]}>
        <Routes>
          <Route path="/photos/:userId" element={<UserPhotos />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(`Photos of ${user.first_name} ${user.last_name}`)
    ).toBeInTheDocument();

    photos.forEach((photo) => {
      expect(screen.getByAltText(photo.file_name)).toBeInTheDocument();
    });

    const sampleComment = photos[0].comments[0];
    expect(screen.getByText(sampleComment.comment)).toBeInTheDocument();
    const creatorLink = screen.getByRole('link', {
      name: `${sampleComment.user.first_name} ${sampleComment.user.last_name}`,
    });
    expect(creatorLink).toBeInTheDocument();
    expect(creatorLink.getAttribute('href')).toBe(`/users/${sampleComment.user._id}`);
  });
});
