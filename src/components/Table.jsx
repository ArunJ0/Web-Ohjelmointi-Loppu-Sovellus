import React from 'react';

export default function Table({ info }) {
    return (
      <table>
        <tbody>
            <tr>
                <th>Name</th>
                <th>Pokemon Wiki</th>
            </tr>
            {info.map(p => (
            <tr key={p}>
                <td>{p.name}</td>
                <td><a href={"https://pokemon.fandom.com/wiki/"+p.name}>Wiki</a></td>
            </tr>
            ))}
        </tbody>
      </table>
    )
  }