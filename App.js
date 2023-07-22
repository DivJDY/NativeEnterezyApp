/* eslint-disable prettier/prettier */
import React from 'react';
import AWS from 'aws-sdk';
import Navigation from './Navigation';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  // Configure the AWS SDK (Add this at the top of your entry point file)
  AWS.config.update({
    region: 'Asia Pacific (Sydney) ap-southeast-2', // Replace with your desired AWS region
    credentials: new AWS.Credentials({
      accessKeyId: 'AKIA3VWN5ISEQFPNWGOQ',
      secretAccessKey: 'fj3qLkXpJBSS/yZpBQG1uXJ+RRiul1G37YAS78hJ',
    }),
  });

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

// const hostName = 'http://127.0.0.1:5010';
// export const hostName="https://6fe8-202-131-134-244.ngrok-free.app"

export const hostName = 'http://3.26.14.137:5000';
export default App;
