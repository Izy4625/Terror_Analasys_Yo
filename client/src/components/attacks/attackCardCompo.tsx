import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse } from '@mui/material';

import { attack } from '../../types/attack';
const AttackCard: React.FC<{ attack: attack }> = ({ attack }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <Card style={{ margin: '16px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <CardContent>
        {/* Basic Details */}
        <Typography variant="h6" color="textPrimary">
          {attack.country_txt}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Date: `{attack.imonth}/{attack.iday}/{attack.iyear}`
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Attack Type: {attack.attacktype1_txt}
        </Typography>

        {/* Expand Button */}
        <Button variant="text" color="primary" onClick={toggleExpanded}>
          {expanded ? 'Hide Details' : 'View Details'}
        </Button>

        {/* Detailed Information */}
        <Collapse in={expanded}>
          <Typography variant="body2" color="textPrimary" style={{ marginTop: '8px' }}>
            Region: {attack.region_txt}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            City: {attack.city || 'N/A'}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Latitude: {attack.latitude}, Longitude: {attack.longitude}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Target Type: {attack.targtype1_txt}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Target: {attack.target1}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Group Name: {attack.gname}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Weapon Type: {attack.weaptype1_txt}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Number Killed: {attack.nkill || 0}, Number Wounded: {attack.nwound || 0}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            Number of Perpetrators: {attack.nperps || 'Unknown'}
          </Typography>
          <Typography variant="body2" color="textPrimary" style={{ marginTop: '8px' }}>
            Summary: {attack.summary || 'No additional information.'}
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default AttackCard;
