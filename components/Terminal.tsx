import React from 'react';
import { XTerm } from 'xterm-for-react';

const Terminal = () => {
  const xtermRef = React.useRef(null);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
    xtermRef.current.terminal.write(
      'Welcome to \x1B[1;3;31mplayground\x1B[0m $ '
    );
  }, []);

  return (
    // Create a new terminal and set it's ref.
    <XTerm
      ref={xtermRef}
      onData={(data) => {
        const code = data.charCodeAt(0);
        // If the user hits empty and there is something typed echo it.
        if (code === 13 && input === 'cls') {
          xtermRef.current.terminal.write('\x1bc');
          xtermRef.current.terminal.write('echo> ');
          setInput('');
          return;
        } else if (code === 13 && input === 'date') {
          xtermRef.current.terminal.write('\x1bc');
          xtermRef.current.terminal.write(`${Date()}\r\n`);
          xtermRef.current.terminal.write('echo> ');
          setInput('');
          return;
        } else if (code === 13 && input.length > 0) {
          xtermRef.current.terminal.write(
            "\r\nNo Such Command: '" + input + "'\r\n"
          );
          xtermRef.current.terminal.write('echo> ');
          setInput('');
        } else if (code < 32 || code === 127) {
          // Disable control Keys such as arrow keys
          return;
        } else {
          // Add general key press characters to the terminal
          xtermRef.current.terminal.write(data);
          setInput(input + data);
        }
      }}
    />
  );
};

export default Terminal;
