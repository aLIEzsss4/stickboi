import { usePlugin } from "../hooks/usePlugin";

export const Plugin = () => {
  const { pluginActive, setPluginActive } = usePlugin();

  return (
    <div className="flex items-center">
      <input
        checked={pluginActive}
        onChange={() => setPluginActive(!pluginActive)}
        id="checked-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Active plugin
      </label>
    </div>
  );
};
