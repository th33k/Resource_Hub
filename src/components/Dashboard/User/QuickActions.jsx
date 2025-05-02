import { useNavigate } from 'react-router-dom';

// Accept actions as a prop
export const QuickActions = ({ actions }) => {
  const navigate = useNavigate();

  // Handler to navigate to the specified path
  const handleAction = (path) => {
    if (path) {
      navigate(path); // Use navigate to change the route
    } else {
      console.warn("Action triggered with no path defined.");
    }
  };

  // Render actions dynamically if provided, otherwise show a message or default actions
  if (!actions || actions.length === 0) {
    return <div className="p-4 text-gray-500">No quick actions available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {actions.map((action, index) => (
        <button
          key={index} // Use index as key, or a unique ID if available
          onClick={() => handleAction(action.path)}
          className="text-gray-700 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left w-full flex flex-col items-start" // Added flex for alignment
        >
          {/* Render the icon component passed in the action object */}
          {action.icon && <action.icon className={`${action.iconColor || 'text-gray-500'} mb-2`} size={24} />}
          <h3 className="font-medium mb-1 text-base">{action.title}</h3> {/* Adjusted margin and text size */}
          <p className="text-sm text-gray-600">{action.description}</p>
        </button>
      ))}
    </div>
  );
}
