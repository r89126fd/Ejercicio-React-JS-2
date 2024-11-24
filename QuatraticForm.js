import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

const QuadraticForm = () => {
  const [values, setValues] = useState({ a: '', b: '', c: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const calculate = () => {
    const { a, b, c } = values;

    if (!a || !b || !c) {
      setError('Todos los campos son obligatorios');
      setResult(null);
      return;
    }

    if (a === '0') {
      setError('El valor de "a" no puede ser 0.');
      setResult(null);
      return;
    }

    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      setError('La ecuación no tiene soluciones reales.');
      setResult(null);
    } else {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      setResult({ x1, x2 });
      setError(null);
    }
  };

  const resetForm = () => {
    setValues({ a: '', b: '', c: '' });
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h2>Calculadora de Fórmula Cuadrática</h2>
      <div className="form-group">
        <label>Valor de a:</label>
        <input
          type="number"
          name="a"
          value={values.a}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Valor de b:</label>
        <input
          type="number"
          name="b"
          value={values.b}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Valor de c:</label>
        <input
          type="number"
          name="c"
          value={values.c}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button onClick={calculate} className="btn btn-primary mt-3">
        Calcular
      </button>
      <button onClick={resetForm} className="btn btn-secondary mt-3 ml-3">
        Limpiar
      </button>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {result && (
        <Alert variant="success" className="mt-3">
          <p>Solución 1: {result.x1}</p>
          <p>Solución 2: {result.x2}</p>
        </Alert>
      )}
    </div>
  );
};

export default QuadraticForm;
