import React from 'react';
import { MatchText, SearchProvider } from 'react-ctrl-f';
import Search from './Search';

export default function App() {
  return (
    <SearchProvider>
      <div
        style={{
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '100%',
          border: '1px solid green',
          padding: '12px 40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'turquoise',
        }}
      >
        <Search />
      </div>
      <p
        style={{
          minHeight: 200,
          padding: '12px',
          border: '1px solid red',
          margin: '100px 40px',
        }}
      >
        <MatchText id='match-1'>
          React components implement a render() method that takes input data and
          returns what to display. This example uses an XML-like syntax called
          JSX. Input data that is passed into the component can be accessed by
          render() via this.props. JSX is optional and not required to use
          React.
        </MatchText>
      </p>
      {/* <Test/> */}
      <p
        style={{
          minHeight: 200,
          padding: '12px',
          border: '1px solid red',
          margin: '100px 40px',
        }}
      >
        <MatchText id='match-2'>
          React makes it painless to create interactive UIs. Design simple views
          for each state in your application, and React will efficiently update
          and render just the right components when your data changes.
        </MatchText>
      </p>

      <p
        style={{
          minHeight: 200,
          padding: '12px',
          border: '1px solid red',
          margin: '100px 40px',
        }}
      >
        <MatchText id='match-3'>
          We don’t make assumptions about the rest of your technology stack, so
          you can develop new features in React without rewriting existing code.
          React can also render on the server using Node and power mobile apps
          using React Native.
        </MatchText>
      </p>
      <p
        style={{
          minHeight: 200,
          padding: '12px',
          border: '1px solid red',
          margin: '100px 40px',
        }}
      >
        <MatchText id='match-4'>
          React components implement a render() method that takes input data and
          returns what to display. This example uses an XML-like syntax called
          JSX. Input data that is passed into the component can be accessed by
          render() via this.props.
        </MatchText>
      </p>
      <p
        style={{
          minHeight: 200,
          padding: '12px',
          border: '1px solid red',
          margin: '100px 40px',
        }}
      >
        <MatchText id='match-5'>
          These features are possible thanks to a new opt-in mechanism we’re
          adding in React 18. It’s called “concurrent rendering” and it lets
          React prepare multiple versions of the UI at the same time. This
          change is mostly behind-the-scenes, but it unlocks new possibilities
          to improve both real and perceived performance of your app.
        </MatchText>
      </p>
      <p
        style={{
          minHeight: 200,
          padding: '12px',
          border: '1px solid red',
          margin: '100px 40px',
        }}
      >
        <MatchText id='match-6'>
          Since concurrency in React 18 is opt-in, there are no significant
          out-of-the-box breaking changes to component behavior. You can upgrade
          to React 18 with minimal or no changes to your application code, with
          a level of effort comparable to a typical major React release. Based
          on our experience converting several apps to React 18, we expect that
          many users will be able to upgrade within a single afternoon.
        </MatchText>
      </p>
    </SearchProvider>
  );
}
