import React from 'react';

class Profile extends React.Component {
  render() {
    console.log(this.props.user);
    return (
      <h1>This is profile component</h1>
    )
  }
}

export default Profile;