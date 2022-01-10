// @flow
import React from 'react';
import NumberBadge from 'components/NumberBadge';
import Tooltip from 'components/Tooltip';
import { generateUserInitials, generateUserName, generateUserColor } from 'utils';
import type { User, Team } from 'types';
import { AssigneeWrapper, Assignee } from './styled';
import TeamIcon from './img/team.svg';

type Props = {
  id: number | string,
  assignedTo?: [User],
  supportUsers?: User[],
  team?: Team,
  threshold: number,
  offset?: number,
  size?: 'sm',
  tooltip?: 'true' | 'false',
};

type AssigneeType = $Shape<User & { team?: boolean }>;

export default (props: Props) => {
  const { id, assignedTo, supportUsers, team, threshold, offset, size, tooltip } = props;
  const assignees: AssigneeType[] = [];

  if (assignedTo) {
    assignees.push(assignedTo[0]);
  }

  if (supportUsers) {
    supportUsers.forEach(assignee => {
      assignees.push(assignee);
    });
  }

  if (team && team[0]) {
    assignees.push({
      team: true,
      ...team[0],
    });
  }

  /* eslint-disable no-shadow */
  /**
   * @param {AssigneeType[]} assignees
   * @param {number} threshold
   * @return {React$Node}
   */
  const truncateAssignees = (assignees: AssigneeType[], threshold: number) => {
    const truncatedAssignees = assignees.slice(0, threshold);
    return (
      <AssigneeWrapper>
        <ul>
          {// eslint-disable-next-line array-callback-return
          truncatedAssignees.map((assignee, idx) => {
            if (assignee) {
              const assigneeInitials = generateUserInitials(assignee);
              const assigneeColor = generateUserColor(assignee.id);
              const assigneeContent = assignee.avatar ? '' : assigneeInitials.toUpperCase();
              return (
                <Assignee
                  size={size}
                  offset={offset}
                  index={idx}
                  avatar={assignee.avatar}
                  assigneeColor={assigneeColor}
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${assigneeInitials}-${id}-${idx}`}
                >
                  {assignee.team ? <TeamIcon /> : assigneeContent}
                </Assignee>
              );
            }
          })}
        </ul>
        {assignees.length > threshold && <NumberBadge plus count={assignees.length - threshold} />}
      </AssigneeWrapper>
    );
  };
  /* eslint-enable no-shadow */

  // eslint-disable-next-line array-callback-return
  const tooltipContent = assignees.map((assignee, idx) => {
    const assigneeName = generateUserName(assignee);

    // First assginee and not a team
    if (idx === 0 && assignee && !assignee.hasOwnProperty('team')) {
      return assigneeName;
    }

    // Not first assginee and not a team
    if (idx !== 0 && assignee && !assignee.hasOwnProperty('team')) {
      return `<br />${assigneeName}`;
    }

    // Many assignees with a team
    if (idx !== 0 && assignee && assignee.hasOwnProperty('team')) {
      return `<br /><aside></aside><i>Team</i>${assigneeName}`;
    }

    // Only a team
    if (idx === 0 && assignee && assignee.hasOwnProperty('team')) {
      return `<i>Team</i>${assigneeName}`;
    }
  });

  return (
    <Tooltip
      id={`tooltip-${id}`}
      value={tooltipContent}
      // eslint-disable-next-line react/no-children-prop
      children={!assignees.length ? 'No Assignee(s)' : truncateAssignees(assignees, threshold)}
      effect="solid"
      place="bottom"
      display={tooltip}
    />
  );
};
