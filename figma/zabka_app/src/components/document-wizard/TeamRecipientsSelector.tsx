import { useState } from 'react';
import { X, Heart, Users } from 'lucide-react';
import { teamConfig, TeamName } from '../utils/teamIcons';

interface Person {
  id: string;
  name: string;
  role: string;
  team: string;
}

// Full list of people with departments
export const allPeople: Person[] = [
  { id: 'p1', name: 'Anna Kowalska', role: 'HR Manager', team: 'HR' },
  { id: 'p2', name: 'Jan Nowak', role: 'HR Specialist', team: 'HR' },
  { id: 'p3', name: 'Maria Wójcik', role: 'Recruiter', team: 'HR' },
  { id: 'p4', name: 'Piotr Lewandowski', role: 'Legal Counsel', team: 'Dział Prawny' },
  { id: 'p5', name: 'Katarzyna Zielińska', role: 'Compliance Officer', team: 'Dział Prawny' },
  { id: 'p6', name: 'Tomasz Kamiński', role: 'Contract Manager', team: 'Dział Prawny' },
  { id: 'p7', name: 'Michał Szymański', role: 'Software Engineer', team: 'IT & Tech' },
  { id: 'p8', name: 'Agnieszka Dąbrowska', role: 'DevOps Engineer', team: 'IT & Tech' },
  { id: 'p9', name: 'Paweł Mazur', role: 'Tech Lead', team: 'IT & Tech' },
  { id: 'p10', name: 'Joanna Krawczyk', role: 'Marketing Manager', team: 'Marketing' },
  { id: 'p11', name: 'Marek Adamski', role: 'Social Media Specialist', team: 'Marketing' },
  { id: 'p12', name: 'Ewa Sikora', role: 'Content Creator', team: 'Marketing' },
  { id: 'p13', name: 'Adam Michalski', role: 'Operations Manager', team: 'Ogólny' },
  { id: 'p14', name: 'Zofia Nowakowska', role: 'Executive Assistant', team: 'Ogólny' },
  { id: 'p15', name: 'Bartosz Kowalczyk', role: 'Business Analyst', team: 'Ogólny' },
];

interface TeamRecipientsSelectorProps {
  selectedTeams: string[];
  onTeamsChange: (teams: string[]) => void;
  selectedRecipients: string[];
  onRecipientsChange: (recipients: string[]) => void;
  language?: 'pl' | 'en';
  theme?: 'light' | 'dark';
}

export function TeamRecipientsSelector({
  selectedTeams,
  onTeamsChange,
  selectedRecipients,
  onRecipientsChange,
  language = 'pl',
  theme = 'dark'
}: TeamRecipientsSelectorProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('HR');
  const [favorites, setFavorites] = useState<string[]>(['p1', 'p5', 'p8']); // IDs of favorite people

  const teams = ['HR', 'Dział Prawny', 'IT & Tech', 'Marketing', 'Ogólny'];

  // Toggle team selection
  const toggleTeam = (team: string) => {
    if (team === 'Ogólny') {
      // Sprawdź czy wszystkie osoby są zaznaczone
      const allPeopleIds = allPeople.map(p => p.id);
      const allSelected = allPeopleIds.every(id => selectedRecipients.includes(id));
      
      if (allSelected) {
        // DRUGIE KLIKNIĘCIE - wszystkie osoby są zaznaczone, więc odznacz wszystkie
        onRecipientsChange([]);
      } else {
        // PIERWSZE KLIKNIĘCIE - zaznacz wszystkie osoby
        onRecipientsChange(allPeopleIds);
      }
    } else {
      if (selectedTeams.includes(team)) {
        onTeamsChange(selectedTeams.filter(t => t !== team));
      } else {
        const newTeams = selectedTeams.filter(t => t !== 'Ogólny');
        onTeamsChange([...newTeams, team]);
      }
    }
  };

  const toggleRecipient = (personId: string) => {
    if (selectedRecipients.includes(personId)) {
      onRecipientsChange(selectedRecipients.filter(id => id !== personId));
    } else {
      onRecipientsChange([...selectedRecipients, personId]);
    }
  };

  // Select ALL people from a team (used by checkbox)
  const selectAllFromTeam = (team: string) => {
    const teamPeopleIds = allPeople.filter(p => p.team === team).map(p => p.id);
    const newRecipients = [...new Set([...selectedRecipients, ...teamPeopleIds])];
    onRecipientsChange(newRecipients);
  };

  // Deselect ALL people from a team (used by checkbox when checked)
  const deselectAllFromTeam = (team: string) => {
    const teamPeopleIds = allPeople.filter(p => p.team === team).map(p => p.id);
    const newRecipients = selectedRecipients.filter(id => !teamPeopleIds.includes(id));
    onRecipientsChange(newRecipients);
  };

  // Check if all people from a team are selected
  const areAllPeopleFromTeamSelected = (team: string) => {
    const teamPeopleIds = allPeople.filter(p => p.team === team).map(p => p.id);
    return teamPeopleIds.length > 0 && teamPeopleIds.every(id => selectedRecipients.includes(id));
  };

  const toggleFavorite = (personId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(personId)) {
      setFavorites(favorites.filter(id => id !== personId));
    } else {
      setFavorites([...favorites, personId]);
    }
  };

  const removeFavorite = (personId: string) => {
    setFavorites(favorites.filter(id => id !== personId));
  };

  const departmentPeople = allPeople.filter(p => p.team === selectedDepartment);
  const favoritePeople = allPeople.filter(p => favorites.includes(p.id));

  return (
    <div className="space-y-6">
      {/* Main Two-Column Layout */}
      <div className={`border rounded-xl p-6 ${
        theme === 'dark'
          ? 'bg-[#0F1229] border-[rgba(0,182,122,0.2)]'
          : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-[300px_1fr] gap-6">
          {/* LEFT COLUMN - Departments List */}
          <div className="space-y-3">
            <h3 className={`text-[16px] leading-[24px] tracking-[-0.3125px] mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Działy</h3>
            {teams.map(team => {
              const teamStyle = teamConfig[team as TeamName] || teamConfig['Ogólny'];
              const TeamIcon = teamStyle.icon;
              const peopleCount = allPeople.filter(p => p.team === team).length;
              const isActive = selectedDepartment === team;
              
              return (
                <button
                  key={team}
                  onClick={() => {
                    setSelectedDepartment(team);
                    toggleTeam(team);
                  }}
                  className={`w-[300px] h-[60px] flex items-center gap-[12px] px-[14px] py-[2px] rounded-[10px] transition-all ${
                    isActive
                      ? 'bg-[rgba(0,182,122,0.2)] border-2 border-[#00b67a]'
                      : theme === 'dark'
                        ? 'bg-[#1a1d3a] border-2 border-transparent hover:border-[rgba(0,182,122,0.5)]'
                        : 'bg-gray-50 border-2 border-transparent hover:border-[rgba(0,182,122,0.5)]'
                  }`}
                >
                  {/* Icon Container */}
                  <div 
                    className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 border"
                    style={{ 
                      backgroundColor: team === 'Ogólny' ? '#00B67A20' : `${teamStyle.color}20`,
                      borderColor: team === 'Ogólny' ? '#00B67A40' : `${teamStyle.color}40`
                    }}
                  >
                    <TeamIcon 
                      className="w-5 h-5" 
                      style={{ color: team === 'Ogólny' ? '#00B67A' : teamStyle.color }}
                    />
                  </div>
                  
                  {/* Text Container */}
                  <div className="flex-1 text-left">
                    <p className={`text-[14px] leading-[20px] tracking-[-0.1504px] ${
                      isActive 
                        ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                        : theme === 'dark' ? 'text-[#d1d5dc]' : 'text-gray-600'
                    }`}>
                      {team}
                    </p>
                    <p className={`text-[12px] leading-[16px] ${
                      theme === 'dark' ? 'text-[#6a7282]' : 'text-gray-500'
                    }`}>
                      {peopleCount} osób
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN - People List for Selected Department */}
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-2">
                <h3 className={`text-[16px] leading-[24px] tracking-[-0.3125px] ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>{selectedDepartment}</h3>
                <span className={`text-[14px] leading-[20px] tracking-[-0.1504px] ${
                  theme === 'dark' ? 'text-[#99a1af]' : 'text-gray-600'
                }`}>({departmentPeople.length} osób)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => selectAllFromTeam(selectedDepartment)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-b from-[#00b67a] to-[#00a066] hover:from-[#00a066] hover:to-[#008F5A] text-white px-4 h-[32px] rounded-[10px] transition-all text-[14px] leading-[20px] tracking-[-0.1504px] focus:outline-none focus:ring-2 focus:ring-[#00B67A]"
                >
                  Wszyscy
                </button>
                <button
                  onClick={() => deselectAllFromTeam(selectedDepartment)}
                  className={`px-4 h-[34px] rounded-[10px] transition-all border text-[14px] leading-[20px] tracking-[-0.1504px] focus:outline-none focus:ring-2 focus:ring-[#00B67A] ${
                    theme === 'dark'
                      ? 'bg-[#1a1d3a] hover:bg-[#252840] text-white border-[rgba(0,182,122,0.3)]'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                  }`}
                >
                  Odznacz
                </button>
              </div>
            </div>

            {/* People List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {departmentPeople.map(person => {
                const isSelected = selectedRecipients.includes(person.id);
                const isFavorite = favorites.includes(person.id);

                return (
                  <div
                    key={person.id}
                    className={`w-full flex items-center gap-3 px-[13px] py-px h-[66px] rounded-[10px] border transition-all ${
                      theme === 'dark'
                        ? 'border-[rgba(0,182,122,0.2)] hover:bg-[#1A1D3A]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {/* Checkbox */}
                    <div 
                      onClick={() => toggleRecipient(person.id)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleRecipient(person.id);
                        }
                      }}
                      className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#00B67A] bg-transparent hover:bg-[rgba(0,182,122,0.1)]'
                          : 'border-[#6B7280] bg-transparent hover:border-[rgba(0,182,122,0.4)] hover:bg-[rgba(0,182,122,0.1)]'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-[#00B67A]" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    
                    {/* User Icon */}
                    <Users className="w-5 h-5 text-[#00B67A] flex-shrink-0" />
                    
                    {/* Person Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-[16px] leading-[24px] tracking-[-0.3125px] truncate ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {person.name}
                      </p>
                      <p className={`text-[12px] leading-[16px] truncate ${
                        theme === 'dark' ? 'text-[#99a1af]' : 'text-gray-600'
                      }`}>
                        {person.role}
                      </p>
                    </div>
                    
                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(person.id, e);
                      }}
                      className={`flex-shrink-0 w-[36px] h-[36px] flex items-center justify-center rounded-[10px] transition-colors ${
                        theme === 'dark' ? 'hover:bg-[#252840]' : 'hover:bg-gray-100'
                      }`}
                      title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                    >
                      {isFavorite ? (
                        <Heart className="w-5 h-5 text-[#F0B100] fill-[#F0B100]" />
                      ) : (
                        <Heart className="w-5 h-5 text-[#99a1af]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Section - Lista osób częstej wysyłki */}
      {favoritePeople.length > 0 && (
        <div className={`border rounded-xl p-6 ${
          theme === 'dark'
            ? 'bg-[#0F1229] border-[rgba(240,177,0,0.3)]'
            : 'bg-white border-[rgba(240,177,0,0.4)]'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#F0B100] fill-[#F0B100]" />
              <h3 className={`text-[16px] leading-[24px] tracking-[-0.3125px] ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Lista osób częstej wysyłki <span className={`text-[14px] leading-[20px] ${
                  theme === 'dark' ? 'text-[#99a1af]' : 'text-gray-600'
                }`}>({favoritePeople.length})</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const favPeople = allPeople.filter(p => favorites.includes(p.id)).map(p => p.id);
                  const newRecipients = [...new Set([...selectedRecipients, ...favPeople])];
                  onRecipientsChange(newRecipients);
                }}
                className="flex items-center gap-1 bg-gradient-to-r from-[#00B67A] to-[#00A066] hover:from-[#00A066] hover:to-[#008F5A] text-white px-4 h-[32px] rounded-[10px] transition-all focus:outline-none focus:ring-2 focus:ring-[#00B67A] text-[14px] leading-[20px] tracking-[-0.1504px]"
              >
                Wszyscy
              </button>
              <button
                onClick={() => {
                  const favPeople = allPeople.filter(p => favorites.includes(p.id)).map(p => p.id);
                  const newRecipients = selectedRecipients.filter(id => !favPeople.includes(id));
                  onRecipientsChange(newRecipients);
                }}
                className={`flex items-center gap-1 px-4 h-[32px] rounded-[10px] transition-all border focus:outline-none focus:ring-2 focus:ring-[#00B67A] text-[14px] leading-[20px] tracking-[-0.1504px] ${
                  theme === 'dark'
                    ? 'bg-[#1A1D3A] hover:bg-[#252840] text-white border-[rgba(0,182,122,0.3)]'
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                }`}
              >
                Odznacz
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoritePeople.map(person => {
              const teamStyle = teamConfig[person.team as TeamName] || teamConfig['Ogólny'];
              const isSelected = selectedRecipients.includes(person.id);

              return (
                <div
                  key={person.id}
                  className={`relative border rounded-[10px] h-[102px] p-4 transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-[#1A1D3A] border-[rgba(0,182,122,0.2)] hover:border-[rgba(0,182,122,0.5)]'
                      : 'bg-gray-50 border-gray-200 hover:border-[rgba(0,182,122,0.5)]'
                  }`}
                  onClick={() => toggleRecipient(person.id)}
                >
                  {/* Checkbox */}
                  <div 
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleRecipient(person.id);
                      }
                    }}
                    className={`absolute top-3 left-3 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#00B67A] bg-transparent hover:bg-[rgba(0,182,122,0.1)]'
                        : 'border-[#6B7280] bg-transparent hover:border-[rgba(0,182,122,0.4)] hover:bg-[rgba(0,182,122,0.1)]'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-[#00B67A]" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(person.id);
                    }}
                    className="absolute top-2 right-2 w-4 h-4 text-[#99a1af] hover:text-red-500 transition-colors z-10"
                    title="Usuń z ulubionych"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col gap-1 pl-7">
                    <div className="flex items-center gap-2">
                      <p className={`text-[14px] leading-[20px] tracking-[-0.1504px] truncate pr-6 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>{person.name}</p>
                      <Heart className="w-4 h-4 text-[#F0B100] fill-[#F0B100] flex-shrink-0" />
                    </div>
                    <p className={`text-[12px] leading-[16px] truncate ${
                      theme === 'dark' ? 'text-[#99a1af]' : 'text-gray-600'
                    }`}>{person.role}</p>
                    <span 
                      className="text-[12px] leading-[16px] px-2 py-0.5 rounded-full inline-block w-fit mt-1"
                      style={{
                        backgroundColor: `${teamStyle.color}20`,
                        color: teamStyle.color
                      }}
                    >
                      {person.team}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}