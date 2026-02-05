import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#e53e3e' }}>問題が発生しました</h1>
                    <p style={{ marginBottom: '20px' }}>アプリケーションにエラーが発生し、表示できません。</p>
                    <div style={{
                        backgroundColor: '#f7fafc',
                        padding: '15px',
                        borderRadius: '8px',
                        textAlign: 'left',
                        overflow: 'auto',
                        marginBottom: '20px',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace'
                    }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('my-best-cabinet');
                            localStorage.removeItem('my_saved_cabinet');
                            window.location.href = '/';
                        }}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#3182ce',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        データをリセットしてトップに戻る
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
