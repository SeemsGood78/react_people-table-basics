import React, { useEffect, useState } from 'react';
import PersonLink from './PersonLink';
import { useNavigate, useParams } from 'react-router-dom';

const PeopleTable = ({ people }) => {
  const { slug } = useParams();
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    setSelectedPerson(slug);
  }, [slug]);

  const handleRowClick = (person) => {
    setSelectedPerson(person.slug);
  };

  const findPersonByName = (name) => people.find((p) => p.name === name);

  return people.length === 0 ? (
    <p>There are no people on the server</p>
  ) : (
    <table data-cy="peopleTable" className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={selectedPerson === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} setSelectedPerson={setSelectedPerson} onClick={() => handleRowClick(person)} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {findPersonByName(person.motherName) ? (
                <PersonLink person={findPersonByName(person.motherName)} setSelectedPerson={setSelectedPerson} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {findPersonByName(person.fatherName) ? (
                <PersonLink person={findPersonByName(person.fatherName)} setSelectedPerson={setSelectedPerson} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
