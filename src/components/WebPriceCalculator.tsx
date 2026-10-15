import React from 'react';
import { WebInteractiveQuoter } from './WebInteractiveQuoter';

/**
 * Re-export para mantener retrocompatibilidad total con cualquier parte del sistema.
 * El nuevo módulo oficial es WebInteractiveQuoter.
 */
export const WebPriceCalculator: React.FC = () => {
  return <WebInteractiveQuoter />;
};

export { WebInteractiveQuoter };
export default WebInteractiveQuoter;
