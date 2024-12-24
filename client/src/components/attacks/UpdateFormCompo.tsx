import React, { useState } from 'react';
import { TextField, Button} from '@mui/material';
import { attack } from '../../types/attack'
import Grid from '@mui/material/Grid2';
interface FormComponentProps {
  defaultValues: attack;
}

const FormComponent: React.FC<FormComponentProps> = ({ defaultValues }) => {
  // Initialize form state with default values from props
  const [formValues, setFormValues] = useState<attack>(defaultValues);
  const [errors, setErrors] = useState<any>({});

  // Handle change in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle form submission (example for logging the values)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation (basic example)
    let formErrors: any = {};
    if (!formValues.latitude || !formValues.longitude) {
      formErrors.coordinates = 'Latitude and Longitude are required';
    }
    if (!formValues.country_txt) {
      formErrors.country_txt = 'Country is required';
    }
    if (!formValues.gname) {
      formErrors.gname = 'Group name is required';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      // Submit form (for now just log the values)
      console.log(formValues);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Country */}
        <Grid>
          <TextField
            label="Country"
            name="country_txt"
            value={formValues.country_txt}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.country_txt}
            helperText={errors.country_txt}
          />
        </Grid>

        {/* Group Name */}
        <Grid container spacing={2}>
          <TextField
            label="Group Name"
            name="gname"
            value={formValues.gname}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.gname}
            helperText={errors.gname}
          />
        </Grid>

        {/* Latitude */}
        <Grid container spacing={2}>
          <TextField
            label="Latitude"
            name="latitude"
            type="number"
            value={formValues.latitude}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.coordinates}
            helperText={errors.coordinates}
          />
        </Grid>

        {/* Longitude */}
        <Grid container spacing={2}>
          <TextField
            label="Longitude"
            name="longitude"
            type="number"
            value={formValues.longitude}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.coordinates}
            helperText={errors.coordinates}
          />
        </Grid>

        {/* Attack Type */}
        <Grid container spacing={2}>
          <TextField
            label="Attack Type"
            name="attacktype1_txt"
            value={formValues.attacktype1_txt}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Target Type */}
        <Grid container spacing={2}>
          <TextField
            label="Target Type"
            name="targtype1_txt"
            value={formValues.targtype1_txt}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Target */}
        <Grid container spacing={2}>
          <TextField
            label="Target"
            name="target1"
            value={formValues.target1}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Weapons Type */}
        <Grid container spacing={2}>
          <TextField
            label="Weapon Type"
            name="weaptype1_txt"
            value={formValues.weaptype1_txt}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Number Killed */}
        <Grid container spacing={2}>
          <TextField
            label="Number Killed"
            name="nkill"
            type="number"
            value={formValues.nkill}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Number Wounded */}
        <Grid container spacing={2}>
          <TextField
            label="Number Wounded"
            name="nwound"
            type="number"
            value={formValues.nwound}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Number of Perpetrators */}
        <Grid container spacing={2}>
          <TextField
            label="Number of Perpetrators"
            name="nperps"
            type="number"
            value={formValues.nperps}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Summary */}
        <Grid container spacing={2}>
          <TextField
            label="Summary"
            name="summary"
            value={formValues.summary}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
        </Grid>

        {/* Submit Button */}
        <Grid container spacing={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormComponent;
