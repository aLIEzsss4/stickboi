import { Has, getComponentValue } from "@latticexyz/recs";
import { useMUD } from "../MUDContext";
import { useEntityQuery } from "@latticexyz/react";
import { shortenAddress } from "../utils";

export function Rank() {
  const {
    components: { Record },
    network: { walletClient },
  } = useMUD();

  const rankList = useEntityQuery([Has(Record)]).map((uuid) => {
    return getComponentValue(Record, uuid);
  });

  // sort the array by score
  rankList.sort((a, b) => {
    if (!a) {
      return -1;
    }
    if (!b) {
      return 1;
    }
    return Number(a.score) - Number(b.score);
  });

  return (
    <div>
      <div className="flex flex-col my-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-3 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Highest Value
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rankList.map((item, i) => (
                    <tr key={i}>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {i + 1}
                        {walletClient.account.address == item?.addr
                          ? " (You)"
                          : ""}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {shortenAddress(item?.addr)}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item?.score ? Number(item?.highestValue) : 0}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item?.score ? Number(item?.score) : 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
