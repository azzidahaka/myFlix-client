import React from 'react';

export const UpdateUser = ({ handleSubmit, handleUpdate }) => {
  return (
    <Form className='profile-form' onSubmit={handleSubmit}>
        <h2>Want to change some info?</h2>
      <Form.Group controlId='formUsername'>
        <Form.Label> Username:</Form.Label>
        <Form.Control
          type='text'
          defaultValue={user.UserName}
          onChange={(e) => handleSubmit(e)} //set username state with user input
          required
          minLength='3'
        />
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label> Password:</Form.Label>
        <Form.Control
          type='password'
          defaultValue={user.Password}
          onChange={(e) => handleSubmit(e)}
          required
        />
      </Form.Group>
      <Form.Group controlId='formBirthday'>
        <Form.Label> Birthday:</Form.Label>
        <Form.Control
          type='date'
          defaultValue={user.Birthday}
          onChange={(e) => handleSubmit(e)}
          required
        />
      </Form.Group>
      <Form.Group controlId='formEmail'>
        <Form.Label> Email:</Form.Label>
        <Form.Control
          type='email'
          defaultValue={user.Email}
          onChange={(e) => handleSubmit(e)}
          required
        />
      </Form.Group>
      <button type='submit'>Update</button>
    </Form>
  );
};
