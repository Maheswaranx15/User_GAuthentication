import React from 'react';

function TierOptions({ tiers, onTierSelect }) {
  return (
    <div>
      <h2>Select Your Tier</h2>
      <ul>
        {tiers.map((tier) => (
          <li key={tier.id}>
            <label>
              <input
                type="radio"
                name="tier"
                value={tier.id}
                onChange={() => onTierSelect(tier)}
              />
              {tier.name} - ${tier.price}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TierOptions;
