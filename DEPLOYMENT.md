# Guardian Swap - Vercel Deployment Guide

This guide provides step-by-step instructions for deploying Guardian Swap to Vercel.

## Prerequisites

- GitHub account with access to the guardian-swap repository
- Vercel account (free tier available)
- Domain name (optional, for custom domain)

## Step-by-Step Deployment

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "New Project" on the dashboard
3. Import the `william66hung/guardian-swap` repository
4. Click "Import" to proceed

### 2. Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=your_rpc_endpoint_here
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
VITE_GUARDIAN_SWAP_CONTRACT=
VITE_FHE_CONTRACT=
```

**Note**: 
- Replace placeholder values with your actual API keys and endpoints
- Leave contract addresses empty until contracts are deployed to Sepolia testnet
- Never commit real API keys to version control

### 3. Deploy

1. Click "Deploy" to start the deployment process
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### 4. Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

### 5. Environment-Specific Configurations

#### Production Environment
- Use mainnet RPC URLs when ready for production
- Update contract addresses to mainnet deployments
- Set appropriate chain IDs for target networks

#### Staging Environment
- Create a separate Vercel project for staging
- Use testnet configurations
- Deploy from a `staging` branch

## Post-Deployment Checklist

- [ ] Verify the application loads correctly
- [ ] Test wallet connection functionality
- [ ] Confirm all environment variables are set
- [ ] Check that the favicon displays properly
- [ ] Test responsive design on mobile devices
- [ ] Verify all external links work

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility
   - Review build logs for specific errors

2. **Environment Variables Not Loading**
   - Ensure variables are prefixed with `VITE_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL accessibility
   - Ensure chain ID matches target network

4. **Contract Interaction Failures**
   - Verify contract addresses are correct
   - Check that contracts are deployed on the target network
   - Ensure user has sufficient gas tokens

### Performance Optimization

1. **Enable Vercel Analytics**
   - Go to project settings
   - Enable Vercel Analytics for performance monitoring

2. **Configure Caching**
   - Set appropriate cache headers for static assets
   - Use Vercel's edge functions for dynamic content

3. **Image Optimization**
   - Use Vercel's built-in image optimization
   - Optimize favicon and other assets

## Monitoring and Maintenance

### Analytics
- Monitor user engagement with Vercel Analytics
- Track performance metrics
- Set up alerts for errors

### Updates
- Enable automatic deployments from main branch
- Use preview deployments for feature branches
- Test changes in preview before merging

### Security
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use Vercel's security features

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs in Vercel dashboard
3. Contact Vercel support if needed
4. Check GitHub issues for known problems

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/installation)
- [Wagmi Documentation](https://wagmi.sh/)

---

**Deployment URL**: Will be provided after successful deployment
**Last Updated**: January 2025
**Version**: 1.0.0
