import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BackButton = ({url}) => {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft>
        <h1>Back</h1>
      </FaArrowCircleLeft>
    </Link>
  );
}

export default BackButton;