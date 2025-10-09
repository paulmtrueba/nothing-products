import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// This component loads the STL geometry and renders the mesh.
const StlModel = (props) => {
  // Use the useLoader hook to load the STL file
  const geometry = useLoader(STLLoader, '/75.220.5.stl');

  return (
    <mesh geometry={geometry} {...props}>
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}
