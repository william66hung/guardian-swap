import React from 'react';

const CrossChainGlobe = () => {
  const networks = [
    { name: 'Ethereum', position: 'top-1/4 left-1/4', color: 'bg-primary' },
    { name: 'Polygon', position: 'top-1/3 right-1/4', color: 'bg-accent' },
    { name: 'Arbitrum', position: 'bottom-1/3 left-1/3', color: 'bg-primary-glow' },
    { name: 'Optimism', position: 'bottom-1/4 right-1/3', color: 'bg-accent-glow' },
    { name: 'Base', position: 'top-1/2 left-1/2', color: 'bg-primary' },
    { name: 'Avalanche', position: 'top-2/3 right-1/2', color: 'bg-accent' },
  ];

  const paths = [
    { from: 'top-1/4 left-1/4', to: 'top-1/3 right-1/4', delay: '0s' },
    { from: 'top-1/3 right-1/4', to: 'bottom-1/3 left-1/3', delay: '1s' },
    { from: 'bottom-1/3 left-1/3', to: 'bottom-1/4 right-1/3', delay: '2s' },
    { from: 'bottom-1/4 right-1/3', to: 'top-1/2 left-1/2', delay: '3s' },
    { from: 'top-1/2 left-1/2', to: 'top-2/3 right-1/2', delay: '4s' },
  ];

  return (
    <div className="relative w-96 h-96 mx-auto">
      {/* Globe container */}
      <div className="relative w-full h-full rounded-full border border-primary/30 gradient-radial animate-orbit">
        {/* Background glow */}
        <div className="absolute inset-0 rounded-full glow opacity-20" />
        
        {/* Grid lines for globe effect */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-4 rounded-full border border-primary/15" />
        <div className="absolute inset-8 rounded-full border border-primary/10" />
        
        {/* Vertical grid lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
        
        {/* Horizontal grid lines */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        
        {/* Network nodes */}
        {networks.map((network, index) => (
          <div
            key={network.name}
            className={`absolute w-4 h-4 rounded-full ${network.color} ${network.position} transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow z-10`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <div className="absolute inset-0 rounded-full animate-ping opacity-20" />
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
              {network.name}
            </div>
          </div>
        ))}
        
        {/* Animated paths */}
        {paths.map((path, index) => (
          <div
            key={index}
            className="absolute inset-0"
          >
            <svg className="w-full h-full" viewBox="0 0 384 384">
              <defs>
                <linearGradient id={`path-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="1" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M ${96 + index * 20} ${96 + index * 30} Q ${192} ${192} ${288 - index * 20} ${288 - index * 30}`}
                stroke={`url(#path-gradient-${index})`}
                strokeWidth="2"
                fill="none"
                className="animate-glow-path"
                style={{ animationDelay: path.delay }}
              />
            </svg>
          </div>
        ))}
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-accent rounded-full animate-floating opacity-60" style={{ animationDelay: '0s' }} />
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary rounded-full animate-floating opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-accent-glow rounded-full animate-floating opacity-60" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-glow scale-110" />
    </div>
  );
};

export default CrossChainGlobe;