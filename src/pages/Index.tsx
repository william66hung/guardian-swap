import React from 'react';
import CrossChainGlobe from '@/components/CrossChainGlobe';
import SwapInterface from '@/components/SwapInterface';
import WalletConnect from '@/components/WalletConnect';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Eye, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary-glow))_0%,transparent_50%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent-glow))_0%,transparent_50%)] opacity-20" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">HiddenSwap</h1>
            <p className="text-xs text-muted-foreground">FHE-Powered Cross-Chain</p>
          </div>
        </div>
        
        <WalletConnect />
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 border-accent/50 text-accent">
            <Zap className="w-3 h-3 mr-1" />
            Fully Homomorphic Encryption
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            Cross-Chain Swaps,
            <br />
            <span className="text-primary">Encrypted by FHE</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Experience the future of DeFi with hidden swap orders that prevent MEV attacks. 
            Your transaction details remain encrypted until execution on the destination chain.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button variant="hero" size="lg">
              <Globe className="w-5 h-5 mr-2" />
              Start Hidden Swap
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Globe and Swap Interface */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Animated Globe */}
          <div className="space-y-8">
            <CrossChainGlobe />
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
                <Shield className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium text-sm">MEV Protection</div>
                  <div className="text-xs text-muted-foreground">Orders encrypted until execution</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
                <Eye className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Privacy First</div>
                  <div className="text-xs text-muted-foreground">FHE encryption technology</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
                <Globe className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium text-sm">Multi-Chain</div>
                  <div className="text-xs text-muted-foreground">6+ networks supported</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-sm">Instant Execution</div>
                  <div className="text-xs text-muted-foreground">Automated cross-chain routing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Swap Interface */}
          <div className="space-y-8">
            <SwapInterface />
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-lg bg-card/30 border border-border/30">
                <div className="text-2xl font-bold text-primary mb-1">$127M</div>
                <div className="text-xs text-muted-foreground">Total Volume</div>
              </div>
              
              <div className="p-4 rounded-lg bg-card/30 border border-border/30">
                <div className="text-2xl font-bold text-accent mb-1">45,678</div>
                <div className="text-xs text-muted-foreground">Hidden Swaps</div>
              </div>
              
              <div className="p-4 rounded-lg bg-card/30 border border-border/30">
                <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">How Hidden Swaps Work</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto glow">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Encrypt Order</h3>
              <p className="text-muted-foreground">Your swap details are encrypted using FHE technology, hiding them from MEV bots and frontrunners.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto glow-accent">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold">Cross-Chain Route</h3>
              <p className="text-muted-foreground">Our protocol finds the optimal path across multiple chains while keeping your order encrypted.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto glow">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold">Execute Privately</h3>
              <p className="text-muted-foreground">Your swap executes on the destination chain with maximum privacy and MEV protection.</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-border/30 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold">HiddenSwap</span>
            <Badge variant="outline" className="text-xs">
              Powered by FHE
            </Badge>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>6 Networks</span>
            <span>•</span>
            <span>24/7 Support</span>
            <span>•</span>
            <span>Open Source</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;