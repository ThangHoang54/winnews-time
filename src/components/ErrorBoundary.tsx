import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper dark:bg-dark-paper text-ink dark:text-dark-ink font-sans flex items-center justify-center p-4">
          <div className="text-center p-8 border-2 border-accent dark:border-dark-accent max-w-lg mx-auto bg-card-paper dark:bg-gray-800 rounded-lg shadow-xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-accent dark:text-dark-accent">Oops! Something Went Wrong</h1>
            <p className="mb-6 text-ink/80 dark:text-dark-ink/80">We're sorry for the inconvenience. An unexpected error occurred. Please try refreshing the page to continue.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-ink dark:bg-dark-ink text-paper dark:text-dark-paper rounded-full hover:bg-accent dark:hover:bg-dark-accent transition-colors font-semibold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;