import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const PrescriptionList = () => {

  const [Prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/Prescription')
      .then(response => response.json())
      .then(data => {
        setPrescriptions(data);
        setLoading(false);
      })
  }, []);

  const remove = async (id) => {
    await fetch(`/api/Prescription/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedPrescriptions = [...Prescriptions].filter(i => i.id !== id);
      setPrescriptions(updatedPrescriptions);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const PrescriptionList = Prescriptions.map(Prescription => {
    const amount = `${Prescription.amount || ''}`;
    return <tr key={Prescription.id}>
      <td style={{whiteSpace: 'nowrap'}}>{Prescription.name}</td>
      <td>$ {parseFloat(amount).toFixed(2)}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/" + Prescription.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => remove(Prescription.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/new">Add Prescription</Button>
        </div>
        <h3>Prescriptions</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="20%">Amount</th>
            <th width="10%"></th>
          </tr>
          </thead>
          <tbody>
          {PrescriptionList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default PrescriptionList;