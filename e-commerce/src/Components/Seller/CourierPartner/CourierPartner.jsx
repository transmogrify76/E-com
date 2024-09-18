import React from 'react';
import './CourierPartner.css'; // Ensure you have this CSS file for styling

const CourierPartnerPreferences = () => {
  // Define the courier partners and their details
  const courierPartners = [
    {
      name: 'xpressbees',
      reverseShippingCharges: 153,
      avgReturnTime: 6.4,
      claimsRaised: 1.4,
      claimApprovalPercentage: 0.0,
    },
    {
      name: 'shadowfax',
      reverseShippingCharges: 155,
      avgReturnTime: 0.0,
      claimsRaised: 'NA', // No claims
      claimApprovalPercentage: 'NA', // No claims
    },
    {
      name: 'delhivery',
      reverseShippingCharges: 157,
      avgReturnTime: 5.2,
      claimsRaised: 0.6,
      claimApprovalPercentage: 0.0,
    },
    {
      name: 'ecom',
      reverseShippingCharges: 163,
      avgReturnTime: 4.7,
      claimsRaised: 5.1,
      claimApprovalPercentage: 0.0,
    },
  ];

  // Function to normalize values and calculate scores
  const calculateScores = (partners) => {
    const maxCharges = Math.max(...partners.map(p => p.reverseShippingCharges));
    const minTime = Math.min(...partners.map(p => p.avgReturnTime));
    const minClaims = Math.min(...partners.map(p => (p.claimsRaised === 'NA' ? Infinity : p.claimsRaised)));
    const maxApproval = Math.max(...partners.map(p => (p.claimApprovalPercentage === 'NA' ? -Infinity : p.claimApprovalPercentage)));

    return partners.map(partner => {
      const normalizedCharges = 1 - (partner.reverseShippingCharges / maxCharges);
      const normalizedTime = 1 - (partner.avgReturnTime / minTime);
      const normalizedClaims = partner.claimsRaised === 'NA' ? 1 : 1 - (partner.claimsRaised / minClaims);
      const normalizedApproval = partner.claimApprovalPercentage === 'NA' ? 0 : partner.claimApprovalPercentage / maxApproval;

      const score = (normalizedCharges + normalizedTime + normalizedClaims + normalizedApproval) / 4;

      return {
        ...partner,
        score,
      };
    });
  };

  // Calculate scores and sort partners
  const rankedPartners = calculateScores(courierPartners).sort((a, b) => b.score - a.score);

  return (
    <div className="courier-partner-preferences">
    <h2>Customer Return Courier Partner Preference</h2>
    
    <ul>
      <li>
        <strong>Decide the courier partner</strong> based on the details given below in the table.
      </li>
      <li>
        <strong>Use set preference</strong> to define your sequence of preferred courier partners.
      </li>
      <li>
        <strong>Returns will be done</strong> using your defined preferred courier partner from this list, depending on their availability and capacity determined by Meesho.
      </li>
    </ul>
    <p>
      To know more, visit <a href="/my-courier-partners">My Courier Partners for Customer Returns</a>.
    </p>
    <h2>My Courier Partners for Customer Returns</h2>
    <h3>Last 1 Month's Customer Returns Performance in Your PIN Code</h3>
      <table>
        <thead>
          <tr>
            <th>Courier Partner</th>
            <th>Reverse Shipping Charges</th>
            <th>Avg Return Time (Days)</th>
            <th>Claims Raised</th>
            <th>Courier Partner Claim Approval %</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankedPartners.map(partner => (
            <tr key={partner.name}>
              <td>{partner.name}</td>
              <td>{partner.reverseShippingCharges ? `₹${partner.reverseShippingCharges} for 1st 500gm` : 'N/A'}</td>
              <td>{partner.avgReturnTime}</td>
              <td>{partner.claimsRaised === 'NA' ? 'No Claims' : `${partner.claimsRaised}%`}</td>
              <td>{partner.claimApprovalPercentage === 'NA' ? 'N/A' : `${partner.claimApprovalPercentage}%`}</td>
              <td>{partner.score.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourierPartnerPreferences;
